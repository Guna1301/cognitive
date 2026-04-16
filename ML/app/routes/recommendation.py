from flask import Blueprint, request, jsonify
from app.models.ml_models import games, similarity

recommendation_bp = Blueprint("recommendation", __name__)


@recommendation_bp.route("/recommendations", methods=["POST"])
def get_recommendations():
    data = request.get_json()
    return jsonify(recommend(
        data["game_name"],
        data["level"],
        data["played"]
    ))


def recommend(game, level, played):
    levels = {"easy": 0, "medium": 1, "hard": 2}

    game_index = games[(games['Game_name'] == game) & (games['level'] == level)].index[0]
    distances = similarity[game_index]

    games_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])

    played.append(game_index)
    recommendations = []

    for i in games_list:
        if games.iloc[i[0]].id not in played:
            recommendations.append((
                games.iloc[i[0]].Game_name,
                games.iloc[i[0]].level
            ))
            if len(recommendations) == 3:
                break

    return recommendations