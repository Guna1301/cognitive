import pickle

model_aut = pickle.load(open("model_files/ml.pkl", "rb"))
model_dislexia = pickle.load(open("model_files/model.pkl", "rb"))
sc = pickle.load(open("model_files/sc_model.pkl", "rb"))

games = pickle.load(open("model_files/games.pkl", "rb"))
similarity = pickle.load(open("model_files/similarity.pkl", "rb"))