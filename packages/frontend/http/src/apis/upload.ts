import { APICollection } from '../config/axios';

class UploadCollection extends APICollection {
  getUploadSignature(folder: string) {
    const params = new URLSearchParams({
      folder,
    });
    return this.client.get(`upload?${params.toString()}`);
  }

  async uploadImage(
    file: File,
    uploadOptions: {
      id: string;
      timestamp: number;
      signature: string;
      apiKey: string;
      cloudName: string;
      folder: string;
    },
  ) {
    const cloudUrl = `https://api.cloudinary.com/v1_1/${uploadOptions.cloudName}/auto/upload`;

    // params: https://cloudinary.com/documentation/image_upload_api_reference#upload_optional_parameters
    const response = await this.client.postForm(cloudUrl, {
      file,
      public_id: uploadOptions.id,
      api_key: uploadOptions.apiKey,
      timestamp: uploadOptions.timestamp,
      signature: uploadOptions.signature,
      folder: uploadOptions.folder,
    });

    return response.data;
  }
}

const uploadApis = new UploadCollection('upload');
export default uploadApis;
