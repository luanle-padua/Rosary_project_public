import os

def rename_mystery_files(directory):
    # Dictionary mapping original filenames to new names
    name_mapping = {
        "1.-Annunciation-Fra-Filippo-Lippi-1443.webp": "the-annunciation.png",
        "2.-The-Visitation-Philippe-de-Champaigne-Date-Unknown.webp": "the-visitation.png",
        "3.-Adoration-of-the-Shepherds-Paolo-Veronese-Date-Unknown.webp": "the-nativity.png",
        "4.-The-Presentation-of-the-Temple-Philippe-de-Champaigne-1648.webp": "the-presentation.png",
        "5.-Christ-with-the-Doctors-in-the-Temple-Paolo-Veronese-c.-1560.webp": "finding-jesus-in-the-temple.png",
        
        "1.-Agony-in-the-Garden-Jacopo-Ligozzi-c.1587.webp": "the-agony-in-the-garden.png",
        "2.-The-Flagellation-of-Our-Lord-Jesus-Christ-William-Adolphe-Bouguereau-1880.webp": "the-scourging-at-the-pillar.png",
        "3.-Crowning-with-Thorns-Dirck-van-Baburen-c.-1622.webp": "the-crowning-with-thorns.png",
        "4.-Christ-Carrying-the-Cross-Giovanni-Battista-Tiepolo-1737-1738.webp": "the-carrying-of-the-cross.png",
        "5.-Christ-on-the-Cross-between-Two-Thieves-Peter-Paul-Rubens-1619-1620.webp": "the-crucifixion.png",
        
        "1.-The-Resurrection-of-Christ-Peter-Paul-Rubens-1611-1612.webp": "the-resurrection.png",
        "2.-The-Ascension-Benjamin-West-Date-Unknown.webp": "the-ascension.png",
        "3.-Pentecost-Jean-II-Restout-1732.webp": "the-descent-of-the-holy-spirit.png",
        "4.-The-Assumption-of-the-Virgin-Bartolomé-Esteban-Murillo-1670s.webp": "the-assumption-of-mary.png",
        "5.-The-Coronation-of-the-Virgin-Annibale-Carracci-After-1595.webp": "the-coronation-of-mary.png",
        
        "1.-The-Baptism-of-Christ-Antoine-Coypel-1690.webp": "the-baptism-of-jesus.png",
        "2.-The-Wedding-at-Cana-Paolo-Veronese-1563.webp": "the-wedding-at-cana.png",
        "3.-The-Sermon-on-the-Mount-Carl-Heinrich-Bloch-Date-Unknown.webp": "the-proclamation-of-the-kingdom.png",
        "4.-The-Transfiguration-Carl-Heinrich-Bloch-Date-Unknown.webp": "the-transfiguration.png",
        "5.-Last-Supper-Peter-Paul-Rubens-1631-1632.webp": "the-institution-of-the-eucharist.png"
    }

    # Change to the specified directory
    os.chdir(directory)
    
    # Iterate through the files and rename them
    for old_name, new_name in name_mapping.items():
        try:
            if os.path.exists(old_name):
                os.rename(old_name, new_name)
                print(f"Renamed: {old_name} -> {new_name}")
            else:
                print(f"File not found: {old_name}")
        except Exception as e:
            print(f"Error renaming {old_name}: {str(e)}")

# Run the script with your directory path
directory_path = r"D:\29.3js\Project_rosary\20241106\responsive-layout\src\assets\images\mysteries"
rename_mystery_files(directory_path)