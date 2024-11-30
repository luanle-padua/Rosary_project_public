const MYSTERY_NAMES = {
  JOYFUL: [
    "the-annunciation",
    "the-visitation",
    "the-nativity",
    "the-presentation",
    "finding-jesus-in-the-temple",
  ],
  SORROWFUL: [
    "the-agony-in-the-garden",
    "the-scourging-at-the-pillar",
    "the-crowning-with-thorns",
    "the-carrying-of-the-cross",
    "the-crucifixion",
  ],
  GLORIOUS: [
    "the-resurrection",
    "the-ascension",
    "the-descent-of-the-holy-spirit",
    "the-assumption-of-mary",
    "the-coronation-of-mary",
  ],
  LUMINOUS: [
    "the-baptism-of-jesus",
    "the-wedding-at-cana",
    "the-proclamation-of-the-kingdom",
    "the-transfiguration",
    "the-institution-of-the-eucharist",
  ],
}
const checkImageSupport = () => {
  return "loading" in HTMLImageElement.prototype
}
const STATIC_IMAGES = {
  LOGO: "/images/logo2.png",
  BACKGROUND: "/images/a.png",
}

// Cache for preloaded images
const imageCache = new Map()

// Helper function for logging image loading issues
const logImageError = (mysteryType, index, error) => {
  console.error(
    `Failed to load mystery image: type=${mysteryType}, index=${index}`,
    error
  )
}

const optimizeImage = (src, options = {}) => {
  if (imageCache.has(src)) {
    return Promise.resolve(imageCache.get(src))
  }

  return new Promise((resolve, reject) => {
    const img = new Image()

    // Only use native lazy loading if supported
    if (checkImageSupport() && options.lowQuality) {
      img.loading = "lazy"
    }

    // Use intersection observer for older browsers
    if (!checkImageSupport() && options.lowQuality) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            img.src = src
            observer.disconnect()
          }
        })
      })
      observer.observe(img)
    } else {
      img.src = src
    }

    img.decoding = options.lowQuality ? "async" : "sync"

    img.onload = () => {
      imageCache.set(src, img)
      resolve(img)
    }

    img.onerror = () => {
      console.warn(`Failed to load: ${src}`)
      reject(new Error(`Failed to load ${src}`))
    }
  })
}

const preloadImages = async () => {
  try {
    // Load only the essential images first
    const essentialImage = await optimizeImage(STATIC_IMAGES.LOGO)

    // Then start loading others in the background
    setTimeout(() => {
      // Load background image
      optimizeImage(STATIC_IMAGES.BACKGROUND, { lowQuality: true }).catch(
        console.warn
      )

      // Load mystery images in chunks
      const loadMysteryImages = async () => {
        const chunkSize = 3

        for (const mysterySet of Object.values(MYSTERY_NAMES)) {
          for (let i = 0; i < mysterySet.length; i += chunkSize) {
            const chunk = mysterySet.slice(i, i + chunkSize)
            await Promise.all(
              chunk.map((mysteryName) =>
                optimizeImage(`/images/mysteries/${mysteryName}.png`, {
                  lowQuality: true,
                }).catch(console.warn)
              )
            )
            // Small delay between chunks to prevent overwhelming the browser
            await new Promise((resolve) => setTimeout(resolve, 100))
          }
        }
      }

      loadMysteryImages()
    }, 1000) // Delay non-critical loads

    return true
  } catch (error) {
    console.error("Error in image preloading:", error)
    return false
  }
}

const getMysteryTypeFromDay = (day) => {
  const dayNum = typeof day === "number" ? day : new Date(day).getDay()

  switch (dayNum) {
    case 1:
    case 6:
      return "JOYFUL"
    case 2:
    case 5:
      return "SORROWFUL"
    case 3:
    case 0:
      return "GLORIOUS"
    case 4:
      return "LUMINOUS"
    default:
      return "JOYFUL"
  }
}

const getMysteryImage = (mysteryType, index) => {
  try {
    if (!mysteryType || typeof index !== "number") {
      return STATIC_IMAGES.BACKGROUND
    }

    const mysteryNames = MYSTERY_NAMES[mysteryType.toUpperCase()]
    if (!mysteryNames?.[index]) {
      return STATIC_IMAGES.BACKGROUND
    }

    const imagePath = `/images/mysteries/${mysteryNames[index]}.png`

    // Trigger background load if not cached
    if (!imageCache.has(imagePath)) {
      optimizeImage(imagePath, { lowQuality: true }).catch((err) =>
        console.warn("Background image load failed:", err)
      )
    }

    return imagePath
  } catch (error) {
    console.error("Error getting mystery image:", error)
    return STATIC_IMAGES.BACKGROUND
  }
}

const getLogo = () => STATIC_IMAGES.LOGO
const getBackgroundImage = () => STATIC_IMAGES.BACKGROUND
const getMysteryNames = () => MYSTERY_NAMES

export {
  getLogo,
  getBackgroundImage,
  getMysteryTypeFromDay,
  getMysteryImage,
  preloadImages,
  getMysteryNames,
}
