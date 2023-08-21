/**
 * @fileoverview This file contains the logic to "translate" each CSV record from input file
 * into Cloudinary Upload API payload.
 */

/**
 * Converts a CSV record from migration input file to a Cloudinary API payload.
 * 
 * 💡Customize this function to suit your needs as per the Cloudinary Upload API specs:
 * https://cloudinary.com/documentation/image_upload_api_reference#upload
 * 
 * Consider below implementation as a "starter".
 * 
 * Typically you'd customize this module to:
 *  - Define which field from the input CSV record to use for the asset URL
 *  - Define how to pass the input CSV record fields with Cloudinary Upload API as the asset's taxonomy (tags, metadata, DAM folder etc.)
 * 
 * @param {Object} csvRec - CSV record from the migration input file
 * @returns {Object} - parameters for Cloudinary API call
 *  - file: the URL to obtain the asset from
 *  - options: options for the Cloudinary Upload API call
 */
exports.input2ApiPayload = function(csvRec) {
    const file = 'https:' + csvRec.image_url;    
    const mtd = {
        onyx_id: csvRec.onyx_id,
        contentful_entryid: csvRec.index,
        contentful_id: csvRec.image_id,
        contentful_image_url: 'https:' + csvRec.image_url,
        department: [csvRec.department],
        artist: csvRec.talent_name,
        talent_id: csvRec.talent_id,
        image_title: csvRec.image_title,
        image_description: csvRec.image_description
    }      
    const options = {
        public_id: 'migration2_test/' + csvRec.public_id,
        unique_filename: false,
        resource_type: 'auto',
        type: 'upload',
        display_name: csvRec.display_name,
        asset_folder: 'migration2_test/' + csvRec.asset_folder,
        metadata: mtd        
    };

    return { file, options };
}
