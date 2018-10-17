import Ember from 'ember'

// This helper returns a full Cloudinary image url
// with some optimization and formats.

let quality = '60'

export function coverImg([id], {size = 250, width, height, format}) {
	if (!width) {
		width = size
	}
	if (!height) {
		height = size
	}
	const base = `https://res.cloudinary.com/radio4000/image/upload/w_${width},h_${height},c_thumb`

	// This is a predefined animated version of webp.
	if (format === 'awebp') {
		return `${base},q_${quality},fl_awebp/${id}.webp`
	}

	// Use this to overwrite the image format.
	if (format) {
		// quality = 'auto'
		return `${base},q_${quality}/${id}.${format}`
	}

	// The default cover image.
	return `${base},q_${quality},c_fill,fl_lossy/${id}`
}

export default Ember.Helper.helper(coverImg)
