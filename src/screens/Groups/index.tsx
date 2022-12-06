import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';

import { GroupCard } from '@components/GroupCard';


import { Container } from './styles';
import { useState } from 'react';
import { FlatList } from 'react-native';


export function Groups() {
  const [groups, setGroups] = useState<string[]>(['Galera da Rockt']);

  return (
    <Container>
      <Header />

      <Highlight
        title='Turmas'
        subTitle='joge com a sua turma'
      
      />

      <FlatList 
        data={groups}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <GroupCard 
            title={item}
          />
          
          
        )}
    

      />

      
    </Container>
  );
}

