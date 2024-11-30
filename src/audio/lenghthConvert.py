import json

# Data to be converted to JSON
audio_lengths = {
    "apostlesCreed.mp3": 36.33,
    "fatimaPrayer.mp3": 8.48,
    "finalPrayer.mp3": 20.56,
    "Finding Jesus in the Temple.mp3": 12.77,
    "gloryBe.mp3": 9.47,
    "Hail Mary full of grace (1).mp3": 12.66,
    "Hail Mary full of grace (10).mp3": 12.87,
    "Hail Mary full of grace (11).mp3": 12.02,
    "Hail Mary full of grace (12).mp3": 12.89,
    "Hail Mary full of grace (13).mp3": 12.18,
    "Hail Mary full of grace (2).mp3": 13.27,
    "Hail Mary full of grace (3).mp3": 12.82,
    "Hail Mary full of grace (4).mp3": 14.74,
    "Hail Mary full of grace (5).mp3": 12.89,
    "Hail Mary full of grace (6).mp3": 12.77,
    "Hail Mary full of grace (7).mp3": 13.91,
    "Hail Mary full of grace (8).mp3": 12.56,
    "Hail Mary full of grace (9).mp3": 13.22,
    "hailHolyQueen.mp3": 28.01,
    "ourFather.mp3": 19.33,
    "signOfCross.mp3": 4.97,
    "The Agony in the Garden.mp3": 9.14,
    "The Annunciation.mp3": 10.83,
    "The Ascension.mp3": 8.43,
    "The Assumption of Mary.mp3": 9.71,
    "The Baptism of Jesus.mp3": 12.34,
    "The Carrying of the Cross.mp3": 9.07,
    "The Coronation of Mary.mp3": 10.26,
    "The Crowning with Thorns.mp3": 9.64,
    "The Crucifixion.mp3": 9.59,
    "The Descent of the Holy Spirit.mp3": 9.81,
    "The Institution of the Eucharist.mp3": 10.64,
    "The Nativity.mp3": 9.14,
    "The Presentation.mp3": 8.69,
    "The Proclamation of the Kingdom.mp3": 9.55,
    "The Resurrection.mp3": 8.01,
    "The Scourging at the Pillar.mp3": 9.00,
    "The Transfiguration.mp3": 8.93,
    "The Visitation.mp3": 8.55,
    "The Wedding at Cana.mp3": 9.36
}

# Write to a JSON file
with open('audio_lengths.json', 'w') as json_file:
    json.dump(audio_lengths, json_file, indent=4)

print("JSON file has been created.")
def convert_seconds_to_milliseconds(audio_lengths):
    return {key: value * 1000 for key, value in audio_lengths.items()}

# Convert the lengths to milliseconds
audio_lengths_ms = convert_seconds_to_milliseconds(audio_lengths)

# Write the converted lengths to a JSON file
with open('audio_lengths_ms.json', 'w') as json_file:
    json.dump(audio_lengths_ms, json_file, indent=4)

print("JSON file with lengths in milliseconds has been created.")