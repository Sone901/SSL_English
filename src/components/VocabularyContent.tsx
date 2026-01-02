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
  const [loadingProgress, setLoadingProgress] = useState(true)

  // Load progress from Vercel KV
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await fetch('/api/user/vocabulary-progress')
        if (response.ok) {
          const data = await response.json()
          setProgress(Array.isArray(data.progress) ? data.progress : [])
        }
      } catch (error) {
        console.error('Error fetching progress:', error)
      } finally {
        setLoadingProgress(false)
      }
    }
    fetchProgress()
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
    <div className="rounded-xl p-8">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4 text-[#8B0000]" style={{textShadow: '2px 2px 4px rgba(139,0,0,0.3)'}}>
          📖 Từ Vựng Tiếng Anh
        </h2>
        <p className="text-gray-700 text-lg">Học từ vựng theo cấp độ và chủ đề từ Dictionary API</p>
      </div>

      {/* Level Selection */}
      <div className="mb-8">
        <h3 className="font-bold text-xl mb-4 text-[#8B0000]">📊 Chọn Cấp Độ:</h3>
        <div className="flex gap-4 flex-wrap">
          {(Object.keys(WORD_BANK) as Array<keyof typeof WORD_BANK>).map((level) => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`py-3 px-8 rounded-lg font-bold transition-all duration-300 ${
                selectedLevel === level
                  ? 'bg-gradient-to-br from-[#8B0000] to-[#A50000] text-[#FFD700] shadow-[0_0_20px_rgba(255,215,0,0.5)] border-2 border-[#FFD700] scale-105'
                  : 'bg-white text-[#8B0000] border-3 border-[#8B0000] hover:border-[#FFD700] hover:shadow-lg hover:scale-105'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Topic Selection */}
      <div className="mb-8">
        <h3 className="font-bold text-xl mb-4 text-[#8B0000]">🎯 Chọn Chủ Đề:</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Object.keys(WORD_BANK[selectedLevel]).map((topic) => {
            const topicInfo = TOPICS[topic]
            const topicProgress = progress.find(p => p.level === selectedLevel && p.topic === topic)
            
            return (
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                className={`p-5 rounded-xl font-semibold transition-all duration-300 text-left relative ${
                  selectedTopic === topic
                    ? 'bg-gradient-to-br from-[#8B0000] to-[#A50000] text-[#FFD700] shadow-[0_0_20px_rgba(255,215,0,0.5)] border-3 border-[#FFD700] scale-105'
                    : 'bg-white/90 backdrop-blur-sm text-[#8B0000] border-3 border-[#8B0000] hover:border-[#FFD700] hover:shadow-lg hover:scale-105'
                }`}
              >
                {topicProgress && (
                  <div className="absolute -top-2 -right-2 bg-[#FFD700] text-[#8B0000] text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border-2 border-[#8B0000]">
                    ⭐ {Math.round((topicProgress.score / topicProgress.total) * 100)}%
                  </div>
                )}
                <div className="text-base font-bold mb-1">{topicInfo.name}</div>
                <div className="text-sm opacity-90">{topicInfo.description}</div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-16">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-[#8B0000]"></div>
          <p className="mt-6 text-[#8B0000] text-lg font-semibold">Đang tải từ vựng từ API...</p>
        </div>
      )}

      {/* Vocabulary List */}
      {!loading && vocabularyList.length > 0 && (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border-4 border-[#8B0000] shadow-xl">
          <h3 className="text-3xl font-bold mb-2 text-[#8B0000]" style={{textShadow: '1px 1px 2px rgba(139,0,0,0.2)'}}>
            {TOPICS[selectedTopic]?.name} - {selectedLevel}
          </h3>
          <p className="text-gray-700 mb-8 text-lg">Hiển thị {vocabularyList.length} từ vựng</p>

          <div className="space-y-5">
            {vocabularyList.map((vocab, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white to-[#FFF5D7] border-3 border-[#8B0000] rounded-xl p-6 hover:shadow-[0_0_20px_rgba(139,0,0,0.3)] transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <h4 className="text-2xl font-bold text-[#8B0000]">{vocab.word}</h4>
                      {vocab.phonetic && (
                        <span className="text-gray-600 italic text-lg">{vocab.phonetic}</span>
                      )}
                      {vocab.audio && (
                        <button
                          onClick={() => playAudio(vocab.audio!)}
                          className="bg-gradient-to-r from-[#8B0000] to-[#A50000] hover:from-[#A50000] hover:to-[#8B0000] text-[#FFD700] px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 shadow-lg hover:shadow-[0_0_15px_rgba(255,215,0,0.5)] border-2 border-[#FFD700]"
                        >
                          🔊 Nghe
                        </button>
                      )}
                      {vocab.partOfSpeech && (
                        <span className="bg-[#FFD700] text-[#8B0000] px-3 py-1.5 rounded-full text-sm font-bold border-2 border-[#8B0000]">
                          {vocab.partOfSpeech}
                        </span>
                      )}
                    </div>
                    
                    <div className="text-[#8B0000] font-bold mb-3 text-lg">
                      🇻🇳 {vocab.vietnamese}
                    </div>

                    {expandedWord === vocab.word && (
                      <>
                        <div className="bg-white p-4 rounded-xl mb-3 border-l-4 border-[#8B0000] shadow-md">
                          <p className="text-base text-gray-800">
                            <strong className="text-[#8B0000]">Definition:</strong> {vocab.definition}
                          </p>
                        </div>
                        <div className="bg-[#FFF5D7] p-4 rounded-xl border-l-4 border-[#FFD700] shadow-md">
                          <p className="text-base text-gray-800">
                            <strong className="text-[#8B0000]">Example:</strong> <em>{vocab.example}</em>
                          </p>
                        </div>
                      </>
                    )}
                  </div>

                  <button
                    onClick={() => toggleWordExpansion(vocab.word)}
                    className="ml-4 bg-gradient-to-br from-[#8B0000] to-[#A50000] hover:from-[#A50000] hover:to-[#8B0000] text-[#FFD700] px-5 py-3 rounded-xl transition-all duration-300 text-sm font-bold shadow-lg hover:shadow-[0_0_15px_rgba(255,215,0,0.5)] border-2 border-[#FFD700]"
                  >
                    {expandedWord === vocab.word ? '▲ Thu gọn' : '▼ Xem thêm'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Practice Button */}
          {vocabularyList.length >= 4 && (
            <div className="mt-8 text-center">
              <Link
                href={`/vocabulary/practice/${selectedLevel}/${selectedTopic}`}
                className="inline-block bg-gradient-to-r from-[#8B0000] via-[#A50000] to-[#8B0000] hover:from-[#A50000] hover:via-[#8B0000] hover:to-[#A50000] text-[#FFD700] px-10 py-5 rounded-2xl font-bold text-xl shadow-[0_0_25px_rgba(255,215,0,0.6)] transition-all duration-300 hover:scale-110 border-4 border-[#FFD700]"
              >
                ✏️ Luyện Tập ({Math.min(10, vocabularyList.length)} câu hỏi)
              </Link>
              {getTopicProgress() && (
                <div className="mt-4 text-base text-[#8B0000] font-semibold">
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
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-16 text-center border-4 border-[#8B0000] shadow-xl">
          <div className="text-7xl mb-6">📚</div>
          <h3 className="text-2xl font-bold text-[#8B0000] mb-3">Chưa có từ vựng</h3>
          <p className="text-gray-700 text-lg">Vui lòng chọn chủ đề khác</p>
        </div>
      )}
    </div>
  )
}
