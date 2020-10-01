import React, { useCallback, useEffect, useState } from 'react';

import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';

import api from '../../services/api';

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
  ProviderText,
  ProvidersList,
  ProviderContainer,
  ProvidersListTitle,
  ProviderAvatar,
  ProviderInfo,
  ProviderName,
  ProviderMeta,
  ProviderMetaText,
} from './styles';

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const Dashboard: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [providersExists, setProvidersExists] = useState(false);

  const {
    // signOut,
    user,
  } = useAuth();
  const { navigate } = useNavigation();

  useEffect(() => {
    api.get('/providers').then(response => {
      setProviders(response.data);
    });

    if (providers.length > 0) setProvidersExists(true);
  }, [providers.length]);

  const NavigateToProfile = useCallback(() => {
    navigate('Profile');
    // signOut();
  }, [navigate]);

  const navigateToCreateAppointment = useCallback(
    (providerId: string) => {
      navigate('CreateAppointment', { providerId });
    },
    [navigate],
  );

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo,
          {'\n'}
          <UserName>{user.name}</UserName>
        </HeaderTitle>

        <ProfileButton onPress={NavigateToProfile}>
          <UserAvatar
            source={
              user.avatar_url
                ? { uri: user.avatar_url }
                : {
                    uri:
                      'https://api.adorable.io/avatars/100/abott@adorable.png',
                  }
            }
          />
        </ProfileButton>
      </Header>

      {!providersExists ? (
        <ProviderText>Não há barbeiros disponíveis</ProviderText>
      ) : (
        <ProvidersList
          data={providers}
          keyExtractor={provider => provider.id}
          ListHeaderComponent={
            <ProvidersListTitle>Cabeleireiros</ProvidersListTitle>
          }
          renderItem={({ item: provider }) => (
            <ProviderContainer
              onPress={() => navigateToCreateAppointment(provider.id)}
            >
              <ProviderAvatar
                source={
                  provider.avatar_url
                    ? { uri: provider.avatar_url }
                    : {
                        uri:
                          'https://api.adorable.io/avatars/100/abott@adorable.png',
                      }
                }
              />

              <ProviderInfo>
                <ProviderName>{provider.name}</ProviderName>

                <ProviderMeta>
                  <Icon name="calendar" size={14} color="#ff9000" />
                  <ProviderMetaText>Segunda à sexta</ProviderMetaText>
                </ProviderMeta>

                <ProviderMeta>
                  <Icon name="clock" size={14} color="#ff9000" />
                  <ProviderMetaText>8h às 18h</ProviderMetaText>
                </ProviderMeta>
              </ProviderInfo>
            </ProviderContainer>
          )}
        />
      )}
    </Container>
  );
};

export default Dashboard;
