import { useEffect, useState } from 'react'
import { fetchAndCacheTestDigest } from '../../services/digestService'
import { useDigestStore } from '../../store/digestStore'

const DigestPage = () => {
    const { content, updatedAt } = useDigestStore()
    const [online, setOnline] = useState(navigator.onLine)

    useEffect(() => {
        const update = () => setOnline(navigator.onLine)
        window.addEventListener('online', update)
        window.addEventListener('offline', update)

        if (online) {
            fetchAndCacheTestDigest()
        }

        return () => {
            window.removeEventListener('online', update)
            window.removeEventListener('offline', update)
        }
    }, [online])

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-2 text-primary-500">📰 Утренний дайджест</h1>
            {updatedAt && (
                <p className="text-sm text-gray-500 mb-4">Обновлено: {new Date(updatedAt).toLocaleString()}</p>
            )}
            {content && content.length > 0 ? (
                <div className="text-black space-y-6">
                    {content.map((article, i) => (
                        <div key={i} className="gap-2">
                            <h2 className="text-2xl font-semibold">Новость {i + 1}: {article.title}</h2>
                            <p className="mb-2">{article.description}</p>
                            <a
                                href={article.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline"
                            >
                                Читать далее
                            </a>
                            <hr className="my-4" />
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-black">Дайджест пока не загружен.</p>
            )}
            {!online && <p className="text-yellow-500 mt-4">⚠️ Вы оффлайн. Показан сохранённый дайджест.</p>}
        </div>
    )
}

export default DigestPage
