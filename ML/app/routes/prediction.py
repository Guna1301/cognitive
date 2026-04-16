from flask import Blueprint, request, jsonify
import numpy as np
from app.models.ml_models import model_aut, model_dislexia, sc

prediction_bp = Blueprint("prediction", __name__)


@prediction_bp.route("/apredict", methods=["POST"])
def autism_predict():
    data = request.json
    features = [np.array(data["answers"])]

    prediction = model_aut.predict(features)[0]

    return jsonify({"prediction": prediction})


@prediction_bp.route("/dpredict", methods=["POST"])
def dyslexia_predict():
    data = request.json
    score = data["vals"]

    prediction = model_dislexia.predict(sc.transform([score]))[0]

    return jsonify({"prediction": int(prediction)})