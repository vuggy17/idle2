import type { GetProp, UploadFile, UploadProps } from 'antd';
import { Avatar, ConfigProvider, Tooltip, Upload } from 'antd';
import { useState } from 'react';

import * as cls from './avatar-upload.css';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export function AvatarWithUpload({ url }: { url: string }) {
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      // eslint-disable-next-line no-param-reassign
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);

    handlePreview(newFileList[0]);

    // upload file to remote
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Tooltip: {
            fontSize: 12,
          },
        },
      }}
    >
      <Upload
        itemRender={() => null}
        maxCount={1}
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        <Tooltip
          title="Replace photo"
          className={cls.avatar}
          placement="bottom"
          arrow={false}
        >
          <Avatar shape="circle" size={64} src={previewImage || url} />
        </Tooltip>
      </Upload>
    </ConfigProvider>
  );
}
