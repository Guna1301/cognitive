from flask import Blueprint, request, jsonify
from app.services.llm_service import generate_response
from app.services.rag_service import search_docs
from app.utils.game_mapper import GAME_ROUTE_MAP
from app.services.cache_service import get_cache, set_cache

chat_bp = Blueprint("chat", __name__)


@chat_bp.route("", methods=["POST"])
def chat():
    data = request.json

    query = data.get("query") or data.get("question")
    user_context = data.get("user_context", {})
    history = data.get("history", [])

    if not query:
        return jsonify({"error": "Query required"}), 400

    cached = get_cache(query)
    if cached:
        return jsonify({
            "answer": cached,
            "source": "cache"
        })

    docs = search_docs(query)
    context = "\n".join(docs)

    prompt = f"""
                You are a friendly AI assistant helping with autism and dyslexia.

                User Profile:
                {user_context}

                Knowledge Context:
                {context}

                User Question:
                {query}

                Instructions:
                - Answer in a natural, conversational tone
                - Avoid repeating the same phrases (like "Here are some ways...")
                - Keep it simple and clear
                - Use short bullet points for steps
                - Give 1–2 practical suggestions (not too many)
                - If suggesting games, briefly explain why they help
                - Sound supportive and human, not robotic
                - Be supportive (e.g., "It’s okay, you can improve this step by step")
                - When suggesting a game, mention it naturally in the sentence
                """

    try:
        keywords = ["how", "improve", "overcome", "help", "ways"]

        if len(docs) > 0 and not any(word in query.lower() for word in keywords):
            answer = docs[0]
            source = "rag"
        else:
            answer = generate_response(prompt)
            source = "llm"

        set_cache(query, answer)

        recommendations = []
        query_lower = query.lower()
        query_lower = query.lower()

        for key, game in GAME_ROUTE_MAP.items():
            if key in query_lower and "game" in query_lower:
                return jsonify({
                    "answer": f"{game['name']}:\n• {game['description']}",
                    "recommendations": [game],
                    "source": "game_info"
                })
        
        weak_areas = user_context.get("weakAreas", [])

        for key, game in GAME_ROUTE_MAP.items():
            for skill in game["skills"]:
                if skill in query_lower:
                    recommendations.append(game)
                    break

        for doc in docs:
            doc_lower = doc.lower()
            for key, game in GAME_ROUTE_MAP.items():
                for skill in game["skills"]:
                    if skill in doc_lower:
                        recommendations.append(game)
                        break

        if not recommendations:
            for area in weak_areas:
                area = area.lower()
                for key, game in GAME_ROUTE_MAP.items():
                    if any(skill in area for skill in game["skills"]):
                        recommendations.append(game)

        recommendations = list({g["route"]: g for g in recommendations}.values())

        if "reading" in query_lower or "dyslexia" in query_lower:
            recommendations = [g for g in recommendations if "reading" in g["skills"]]

        elif "memory" in query_lower:
            recommendations = [g for g in recommendations if "memory" in g["skills"]]

        elif "concentration" in query_lower or "focus" in query_lower:
            recommendations = [g for g in recommendations if "focus" in g["skills"] or "reaction" in g["skills"]]

        # fallback
        if not recommendations:
            recommendations = recommendations[:1]
        else:
            recommendations = recommendations[:2]

        return jsonify({
            "answer": answer,
            "docs_used": docs,
            "recommendations": recommendations,
            "reason": "Recommended based on your query and learning needs",
            "source": source
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500