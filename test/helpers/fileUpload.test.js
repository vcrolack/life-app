import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from '../../src/helpers/fileUpload';

cloudinary.config({ 
  cloud_name: 'dt2to3hsb', 
  api_key: '226512786566561',
  api_secret: 'G-85umhQD6ClWlrZiOYUxNPcGOo',
  secure: true,
});

describe('Testing on File Upload', () => {

  it('Should upload a file to Cloudinary', async () => {

    const imageUrl = "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png";
    const resp  = await fetch( imageUrl);
    const blob = await resp.blob();

    const file = new File([blob], 'photo.jpg');

    const url = await fileUpload(file);

    expect( typeof url ).toBe('string');

    const segments = url.split('/');
    const imageId = segments[segments.length - 1].replace('.png', '');
    await cloudinary.api.delete_resources(['lifeapp/' + imageId]);
  

  });

  it('Should return null', async () => {
    const file = new File([], 'photo.jpg');

    const url = await fileUpload(file);

    expect( url ).toBeNull();
  });

})