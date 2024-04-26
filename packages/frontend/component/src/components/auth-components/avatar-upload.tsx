import type { GetProp, UploadFile, UploadProps } from 'antd';
import { Avatar, ConfigProvider, Tooltip, Upload } from 'antd';
import type { RcFile } from 'antd/es/upload';
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

export function AvatarWithUpload({
  url,
  onUpload,
}: {
  url: string;
  onUpload: (file: File) => Promise<string>;
}) {
  const [previewImage, setPreviewImage] = useState('');

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      // eslint-disable-next-line no-param-reassign
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
  };

  const handleChange: UploadProps['onChange'] = ({ file: newFile }) => {
    const { status, response } = newFile;
    if (status === 'done') {
      setPreviewImage(response as string);
    }
  };

  const handleUpload: UploadProps['customRequest'] = async ({
    file,
    onSuccess,
  }) => {
    const fileUrl = await onUpload(file as RcFile);
    onSuccess(fileUrl);
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
        customRequest={handleUpload}
        showUploadList={false}
        itemRender={() => null}
        maxCount={1}
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
