import { AvatarWithUpload } from '@idle/component/auth-components';
import { fetcher } from '@idle/http';
import {
  App,
  Button,
  ConfigProvider,
  Divider,
  Flex,
  Form,
  Input,
  Layout,
  List,
  Space,
  theme,
  Tooltip,
  Typography,
} from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useSetAtom } from 'jotai';
import { useCallback } from 'react';

import {
  useAuthPreference,
  useCurrentUser,
  useSession,
} from '../../../../hooks/use-session';
import { authAtom } from '../../auth/auth-atom';
import { useAuth } from '../../auth/use-auth';
import { NavArrowRightIcon } from '../icons';

const { useToken } = theme;
const { useForm, useWatch } = Form;
const { useApp } = App;

export default function AccountSetting() {
  const setAuthAtom = useSetAtom(authAtom);
  const user = useCurrentUser();
  const { reload } = useSession();
  const { data, isLoading } = useAuthPreference();
  const { logout } = useAuth();

  const { token } = useToken();
  const [form] = useForm();
  const { message } = useApp();

  const newUserName = useWatch('name', form);
  const shouldDisplaySaveBtn = user.displayName !== newUserName?.trim();

  const updateUserInfo = async (changes: {
    name?: string;
    avatar?: string;
  }) => {
    await fetcher.user.update({
      name: changes.name,
      avatarUrl: changes.avatar,
    });

    await user.update({
      displayName: changes.name,
      avatarUrl: changes.avatar,
    });

    message.success('Your information updated');
  };

  const openCreatePasswordModal = () => {
    setAuthAtom((store) => {
      return {
        ...store,
        openModal: true,
        email: user.email,
        state: 'createPassword',
      };
    });
  };

  const openResetPasswordModal = () => {
    setAuthAtom((store) => {
      return {
        ...store,
        openModal: true,
        email: user.email,
        state: 'resetPassword',
      };
    });
  };

  const openChangeEmailModal = useCallback(() => {
    setAuthAtom((store) => {
      return {
        ...store,
        openModal: true,
        email: user.email,
        state: 'changeEmail',
      };
    });
  }, [setAuthAtom, user.email]);

  const logoutAndRefresh = useCallback(async () => {
    await logout();
    window.location.reload();
  }, [logout]);

  const avatarUpload = useCallback(
    async (file: File) => {
      const folderName = 'avatars';
      const { data: signature } = await fetcher.upload.getUploadSignature(
        folderName,
        true,
      );

      const image = await fetcher.upload.uploadImage(file, {
        ...signature,
        id: user.id,
        folder: folderName,
        apiKey: runtimeConfig.cloudinary.apiKey,
        cloudName: runtimeConfig.cloudinary.cloudName,
        override: true,
      });

      await reload();

      return image.url;
    },
    [reload, user.id],
  );

  return (
    <ConfigProvider
      theme={{
        components: {
          Form: {
            verticalLabelPadding: '0 0 4px',
          },
          Divider: {
            marginLG: 0,
          },
          Layout: {
            bodyBg: 'transparent',
          },
        },
      }}
    >
      <Layout style={{ width: '80%', margin: 'auto' }}>
        <Content className="pt-[5px]">
          <Flex vertical gap="large">
            <div>
              <Typography.Title level={5}>My account settings</Typography.Title>
              <Typography.Text type="secondary">
                Your personal information
              </Typography.Text>
            </div>
            <Divider />
            <section>
              {user.id && (
                <Form
                  requiredMark={false}
                  name="user-info"
                  form={form}
                  layout="vertical"
                  initialValues={{
                    avatar: 'https://source.unsplash.com/random',
                    name: user.displayName,
                  }}
                >
                  <Space>
                    <Form.Item name="avatar">
                      <AvatarWithUpload
                        url={user.avatarUrl}
                        onUpload={avatarUpload}
                      />
                    </Form.Item>
                    <Form.Item
                      required
                      name="name"
                      label={
                        <Typography.Text
                          type="secondary"
                          className="text-sm font-medium"
                        >
                          Display name
                        </Typography.Text>
                      }
                      className="w-56"
                    >
                      <Input />
                    </Form.Item>
                    {shouldDisplaySaveBtn && (
                      <Button
                        type="primary"
                        htmlType="button"
                        onClick={() =>
                          updateUserInfo({ name: form.getFieldValue('name') })
                        }
                      >
                        Save
                      </Button>
                    )}
                  </Space>
                </Form>
              )}
            </section>
            <section>
              <Typography.Title level={5}>Account security</Typography.Title>
              <Divider />
              <List itemLayout="horizontal" split={false}>
                <List.Item
                  style={{
                    paddingInline: 0,
                  }}
                  actions={[
                    <Tooltip
                      key="change-email-btn"
                      title={
                        !data?.isPasswordEnabled
                          ? 'You should create a password before change email'
                          : ''
                      }
                    >
                      <Button
                        disabled={!data?.isPasswordEnabled}
                        loading={isLoading}
                        type="default"
                        onClick={openChangeEmailModal}
                      >
                        Change email
                      </Button>
                    </Tooltip>,
                  ]}
                >
                  <List.Item.Meta
                    title={
                      <Typography.Text
                        style={{
                          fontWeight: 400,
                        }}
                      >
                        Email
                      </Typography.Text>
                    }
                    description={user.email}
                  />
                </List.Item>
                <List.Item
                  style={{
                    paddingInline: 0,
                  }}
                  actions={[
                    data?.isPasswordEnabled ? (
                      <Button
                        loading={isLoading}
                        key="change-password-btn"
                        type="default"
                        onClick={openResetPasswordModal}
                      >
                        Change password
                      </Button>
                    ) : (
                      <Button
                        loading={isLoading}
                        key="create-password-btn"
                        type="default"
                        onClick={openCreatePasswordModal}
                      >
                        Create password
                      </Button>
                    ),
                  ]}
                >
                  <List.Item.Meta
                    title={
                      <Typography.Text
                        style={{
                          fontWeight: 400,
                        }}
                      >
                        Password
                      </Typography.Text>
                    }
                    description="If you lose access to your email address, you'll be able to log in using your password."
                  />
                </List.Item>
              </List>
            </section>
            <section>
              <Typography.Title level={5}>Support</Typography.Title>
              <Divider />
              <List itemLayout="horizontal" split={false}>
                <List.Item
                  style={{
                    paddingInline: 0,
                  }}
                  actions={[
                    <Button
                      key="logout-btn"
                      type="text"
                      onClick={logoutAndRefresh}
                      icon={
                        <NavArrowRightIcon color={token.colorTextDescription} />
                      }
                    />,
                  ]}
                  className="cursor-pointer"
                >
                  <List.Item.Meta
                    title={
                      <Typography.Text
                        style={{
                          fontWeight: 400,
                        }}
                      >
                        Sign out
                      </Typography.Text>
                    }
                    description="Logout from idle"
                  />
                </List.Item>
              </List>
            </section>
          </Flex>
        </Content>
      </Layout>
    </ConfigProvider>
  );
}
