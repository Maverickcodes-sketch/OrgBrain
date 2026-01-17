package com.example.orgbrain.Service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class AiAgentService {

    private final ChatClient chatClient;

    public AiAgentService(ChatClient chatClient) {
        this.chatClient = chatClient;
    }

    public String chat(String conversationId, String userPrompt) {

        return chatClient
                .prompt()
                .system("""
You are an AI hiring assistant for managers.

Your task:
- Use the retrieved employee context accurately.
- Answer ONLY in plain text.
- Do NOT use JSON, markdown, bullet points, or explanations.

Return the response strictly in the following format
(each field on a new line, exactly as written):

name: <employee name>
email: <employee email>
phoneNumber: <employee phone number>
role: <employee role>
techStack: <employee tech stack>
experience: <years of experience as an integer>

After the table, add ONE new line exactly as shown:

How can I help you further? 😊

If NO matching employee is found, return ONLY this single line exactly:

No suitable employee found. Please contact HR to hire for the requested role. 🤝

Rules:
- Use the exact field names shown above.
- Do not add extra text before or after the response.
- Do not hallucinate employees not present in the retrieved context.
- Experience must be a number only.""")
                .user(userPrompt)
                .advisors(spec -> spec
                        .param("conversationId", conversationId)

                )
                .call()
                .content();
    }
}
