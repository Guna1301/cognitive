from flask import Blueprint, request, jsonify, session

assessment_bp = Blueprint("assessment", __name__)


@assessment_bp.route("/quizz", methods=["POST"])
def quiz():
    data = request.json
    answers = data.get("answers")
    score = answers

    Language_vocab = round((score[0]+score[1]+score[2]+score[3]+score[4]+score[5]+score[7]) / 28, 1)
    Memory = round((score[1]+score[8]) / 8, 1)
    speed = 0.5
    Visual_discrimination = round((score[0]+score[2]+score[3]+score[5]) / 16, 1)
    Audio_Discrimination = round((score[6]+score[9]) / 8, 1)

    final = [
        Language_vocab,
        Memory,
        speed,
        Visual_discrimination,
        Audio_Discrimination
    ]

    return jsonify({"scr": final})


@assessment_bp.route("/survey", methods=["POST"])
def survey():
    data = request.json
    answers = data.get("answers")
    f2 = data.get("vals")

    survey_score = round((sum(answers)) / 80, 1)
    f2.append(survey_score)

    session['pred'] = f2

    return jsonify({"scr": f2})