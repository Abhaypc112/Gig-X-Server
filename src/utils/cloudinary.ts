import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

(async function () {
    // Configuration
    cloudinary.config({
        cloud_name: 'dotpzrvnf',
        api_key: '977555224713531',
        api_secret: 'wZb-E29soPZYi6njmb12MHdsbW0' // Click 'View API Keys' above to copy your API secret
    });

    // Upload an image
    try {
        const uploadResult: UploadApiResponse = await cloudinary.uploader.upload(
            "imgfile", {
                public_id: 'shoes',
            }
        );

        console.log(uploadResult);

        // Optimize delivery by resizing and applying auto-format and auto-quality
        const optimizeUrl: string = cloudinary.url('shoes', {
            fetch_format: 'auto',
            quality: 'auto'
        });

        console.log(optimizeUrl);

        // Transform the image: auto-crop to square aspect ratio
        const autoCropUrl: string = cloudinary.url('shoes', {
            crop: 'auto',
            gravity: 'auto',
            width: 500,
            height: 500,
        });

        console.log(autoCropUrl);
    } catch (error) {
        console.error('Upload error:', error);
    }
})();
