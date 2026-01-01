'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import vocabularyData from '@/data/vocabulary.json'
import vietnameseTranslations from '@/data/vietnameseTranslations.json'
import topicsData from '@/data/topics.json'

interface VocabularyWord {
  word: string
  phonetic?: string
  partOfSpeech?: string
  vietnamese: string
  definition: string
  example: string
  level?: string
  topic?: string
  audio?: string
}

interface TopicProgress {
  level: string
  topic: string
  score: number
  total: number
  completedAt: string
}

interface DictionaryAPIResponse {
  word: string
  phonetic?: string
  phonetics?: Array<{
    text?: string
    audio?: string
  }>
  meanings?: Array<{
    partOfSpeech: string
    definitions: Array<{
      definition: string
      example?: string
      synonyms?: string[]
      antonyms?: string[]
    }>
  }>
}

// Type-safe access to imported JSON
const WORD_BANK = vocabularyData as Record<string, Record<string, string[]>>
const VIETNAMESE_TRANSLATIONS = vietnameseTranslations as Record<string, string>
const TOPICS = topicsData as Record<string, { name: string; description: string }>

export default function VocabularyContent() {
  const [selectedLevel, setSelectedLevel] = useState<keyof typeof WORD_BANK>('A1')
  const [selectedTopic, setSelectedTopic] = useState<string>('')
  const [vocabularyList, setVocabularyList] = useState<VocabularyWord[]>([])
  const [loading, setLoading] = useState(false)
  const [expandedWord, setExpandedWord] = useState<string | null>(null)
  const [progress, setProgress] = useState<TopicProgress[]>([])

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('vocabulary_progress')
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress))
    }
  }, [])

  // Fetch word data from Dictionary API
  const fetchWordData = async (word: string): Promise<VocabularyWord | null> => {
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      const data: DictionaryAPIResponse[] = await response.json()

      const entry = data[0]
      const meaning = entry.meanings?.[0]
      const definition = meaning?.definitions[0]

      return {
        word: entry.word,
        phonetic: entry.phonetic || entry.phonetics?.[0]?.text || '',
        partOfSpeech: meaning?.partOfSpeech || '',
        vietnamese: VIETNAMESE_TRANSLATIONS[word.toLowerCase()] || word,
        definition: definition?.definition || 'No definition available',
        example: definition?.example || `This is an example using ${word}.`,
        level: selectedLevel,
        topic: selectedTopic,
        audio: entry.phonetics?.find(p => p.audio)?.audio || ''
      }
    } catch (error) {
      console.error(`Error fetching word "${word}":`, error)
      return null
    }
  }

  // Load vocabulary for selected level and topic
  useEffect(() => {
    const loadVocabulary = async () => {
      if (!selectedTopic) return

      setLoading(true)
      const levelData = WORD_BANK[selectedLevel]
      const words = levelData[selectedTopic as keyof typeof levelData] as string[] | undefined
      
      if (!words || !Array.isArray(words)) {
        setLoading(false)
        return
      }

      const vocabPromises = words.map(word => fetchWordData(word))
      const vocabResults = await Promise.all(vocabPromises)
      const validVocab = vocabResults.filter((v): v is VocabularyWord => v !== null)
      
      setVocabularyList(validVocab)
      setLoading(false)
    }

    loadVocabulary()
  }, [selectedLevel, selectedTopic])

  // Auto-select first topic when level changes
  useEffect(() => {
    const firstTopic = Object.keys(WORD_BANK[selectedLevel])[0]
    setSelectedTopic(firstTopic)
  }, [selectedLevel])

  // Play audio pronunciation
  const playAudio = (audioUrl: string) => {
    if (audioUrl) {
      const audio = new Audio(audioUrl)
      audio.play()
    }
  }

  const toggleWordExpansion = (word: string) => {
    setExpandedWord(expandedWord === word ? null : word)
  }

  // Get topic progress
  const getTopicProgress = () => {
    return progress.find(p => p.level === selectedLevel && p.topic === selectedTopic)
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">📖 Từ Vựng Tiếng Anh</h2>
      <p className="text-gray-600 mb-6">Học từ vựng theo cấp độ và chủ đề từ Dictionary API</p>

      {/* Level Selection */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-3">📊 Chọn Cấp Độ:</h3>
        <div className="flex gap-3 flex-wrap">
          {(Object.keys(WORD_BANK) as Array<keyof typeof WORD_BANK>).map((level) => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`py-2 px-6 rounded-lg font-bold transition ${
                selectedLevel === level
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-400'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Topic Selection */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-3">🎯 Chọn Chủ Đề:</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {Object.keys(WORD_BANK[selectedLevel]).map((topic) => {
            const topicInfo = TOPICS[topic]
            const topicProgress = progress.find(p => p.level === selectedLevel && p.topic === topic)
            
            return (
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                className={`p-4 rounded-lg font-semibold transition text-left relative ${
                  selectedTopic === topic
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-purple-400'
                }`}
              >
                {topicProgress && (
                  <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
                    ⭐ {Math.round((topicProgress.score / topicProgress.total) * 100)}%
                  </div>
                )}
                <div className="text-sm font-bold mb-1">{topicInfo.name}</div>
                <div className="text-xs opacity-75">{topicInfo.description}</div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Đang tải từ vựng từ API...</p>
        </div>
      )}

      {/* Vocabulary List */}
      {!loading && vocabularyList.length > 0 && (
        <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">
            {TOPICS[selectedTopic]?.name} - {selectedLevel}
          </h3>
          <p className="text-gray-600 mb-6">Hiển thị {vocabularyList.length} từ vựng</p>

          <div className="space-y-4">
            {vocabularyList.map((vocab, index) => (
              <div
                key={index}
                className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4 hover:shadow-md transition"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-xl font-bold text-blue-600">{vocab.word}</h4>
                      {vocab.phonetic && (
                        <span className="text-gray-500 italic">{vocab.phonetic}</span>
                      )}
                      {vocab.audio && (
                        <button
                          onClick={() => playAudio(vocab.audio!)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full text-sm transition"
                        >
                          🔊 Nghe
                        </button>
                      )}
                      {vocab.partOfSpeech && (
                        <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-semibold">
                          {vocab.partOfSpeech}
                        </span>
                      )}
                    </div>
                    
                    <div className="text-green-600 font-semibold mb-2">
                      🇻🇳 {vocab.vietnamese}
                    </div>

                    {expandedWord === vocab.word && (
                      <>
                        <div className="bg-white p-3 rounded-lg mb-2 border-l-4 border-blue-500">
                          <p className="text-sm text-gray-700">
                            <strong>Definition:</strong> {vocab.definition}
                          </p>
                        </div>
                        <div className="bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-500">
                          <p className="text-sm text-gray-700">
                            <strong>Example:</strong> <em>{vocab.example}</em>
                          </p>
                        </div>
                      </>
                    )}
                  </div>

                  <button
                    onClick={() => toggleWordExpansion(vocab.word)}
                    className="ml-4 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition text-sm font-semibold"
                  >
                    {expandedWord === vocab.word ? '▲ Thu gọn' : '▼ Xem thêm'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Practice Button */}
          {vocabularyList.length >= 4 && (
            <div className="mt-6 text-center">
              <Link
                href={`/vocabulary/practice/${selectedLevel}/${selectedTopic}`}
                className="inline-block bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg transition"
              >
                ✏️ Luyện Tập ({Math.min(10, vocabularyList.length)} câu hỏi)
              </Link>
              {getTopicProgress() && (
                <div className="mt-3 text-sm text-gray-600">
                  ⭐ Lần trước: {getTopicProgress()!.score}/{getTopicProgress()!.total} điểm 
                  ({Math.round((getTopicProgress()!.score / getTopicProgress()!.total) * 100)}%)
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {!loading && vocabularyList.length === 0 && selectedTopic && (
        <div className="bg-white rounded-lg p-12 text-center border-2 border-gray-200">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Chưa có từ vựng</h3>
          <p className="text-gray-600">Vui lòng chọn chủ đề khác</p>
        </div>
      )}
    </div>
  )
}
