import React from 'react'
import MarkdownRenderer from './MarkdownRenderer'

interface MessageContainerProps {
    messages: any[]
}

function MessageContainer({ messages }: MessageContainerProps) {
    return (
        <div
            id="messages"
            className="border border-gray-300 mt-2 mb-3 py-4 rounded-sm shadow-lg space-y-4 overflow-y-scroll"
        >
            {messages.map((message, index) => (
                <div key={`message.role${index.toString()}`} className="pt-2 w-auto px-2">
                    <p
                        className={`text-lg font-bold ${message.role === "user" ? "text-right" : "text-left"
                            }`}
                    >
                        {message.role === "user" ? "User: " : "AI: "}
                    </p>
                    <div
                        key={message.id}
                        className={`w-auto p-4 rounded-lg ${message.role === "user"
                            ? "text-right"
                            : "text-left bg-gray-600"
                            }`}
                    >
                        {message.role === "user" ? (
                            message.content
                        ) : (
                            <MarkdownRenderer markdown={message.content} />
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MessageContainer
