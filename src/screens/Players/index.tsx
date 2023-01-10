
import { Button } from "@components/Button";
import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { ListEmpty } from "@components/ListEmpty";
import { PlayerCard } from "@components/PlayerCard";
import { useRoute } from "@react-navigation/native";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { playersGetByGroupByTeam } from "@storage/player/playersGetByGroupByTeam";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { AppError } from "@utils/AppError";
import { useEffect, useState, useRef} from "react";
import { Alert, FlatList, TextInput } from "react-native";
import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";

type RouteParams ={
    group: string;
}


export function Players() {
    const [newPlayerName, setNewPlayerName] = useState('')
    const [team, setTeam] = useState('Time A');
    const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

    const route = useRoute();
    const {group}= route.params as RouteParams

    const newPlayerNameInputRef = useRef<TextInput>(null)

    async function handleAddPlayer() {
        if(newPlayerName.trim().length === 0){
            return Alert.alert("Nova Pessoa", "Informe o nome da pessoa para adicionar.")
        }

        const newPlayer = {
            name: newPlayerName,
            team

        }

        try {
            await playerAddByGroup(newPlayer, group)
            newPlayerNameInputRef.current?.blur()
            setNewPlayerName("")
            fetchPlayersByTeam()
            

        } catch (error) {
            if(error instanceof AppError){
                Alert.alert("Nova Pessoa", error.message)
            }else{
                console.log(error)
                Alert.alert("Nova Pessoa", "Não foi possível adiciona.")
            }
        }
    }


    async function fetchPlayersByTeam() {
        try {
            const playersByTeam = await playersGetByGroupByTeam(group, team)
            setPlayers(playersByTeam)
        } catch (error) {
            console.log(error)
            Alert.alert("Pessoas", "Não foi posível carregar as pessoas.")
        }
    }


    async function playerRemove(playerName:string) {
        try {
                
            await playerRemoveByGroup(playerName,group)
            fetchPlayersByTeam()
        } catch (error) {
            Alert.alert("Remover pessoa", "Não foi possível remover essa pessoa.")
            console.log(error)
        }
    }



     function handlePlayerRemove(playerName:string) {
       
        Alert.alert("Remover", "Deseja remover essa pessoa?",[
            {
              text: 'Sim',
              onPress:( ()=> 
                playerRemove(playerName)

              )
      
            },
            {
              text: 'Não',
              style: 'cancel'
            }
          ])

       
    }

 


    useEffect(()=> {
        fetchPlayersByTeam();
    },[team]);

    return (
        <Container>
            <Header showBackButtom />
            <Highlight
                title={group}
                subTitle="adicione a galera e separe os times"
            />

            <Form>
                <Input
                    inputRef={newPlayerNameInputRef}
                    placeholder="Nome da pessoa"
                    autoCorrect={false}
                    onChangeText={setNewPlayerName}
                    value = {newPlayerName}
                    onSubmitEditing={handleAddPlayer}
                    returnKeyType="done"
                />

                <ButtonIcon 
                    icon="add" 
                    onPress={handleAddPlayer}
                
                />


            </Form>

            <HeaderList>

                <FlatList
                    data={['Time A', 'Time B']}
                    keyExtractor={item => item}
                    renderItem={({ item }) => (
                        <Filter
                            title={item}
                            isActive={item === team}
                            onPress={() => setTeam(item)}
                        />
                    )}

                    horizontal
                />

                <NumberOfPlayers>
                    {players.length}
                    
                </NumberOfPlayers>

            </HeaderList>

            <FlatList
                data={players}
                keyExtractor={item => item.name} 
                renderItem={({item} )=> (
                    <PlayerCard
                        name={item.name}
                        onRemove={() => handlePlayerRemove(item.name)}
                    />
                )}  
                
                ListEmptyComponent={() => (
                    <ListEmpty 
                      message="Não há pessoas nesse time."
                    />
                    
                  )}

                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    {paddingBottom:100},
                    players.length === 0 && {flex:1}
                ]}

            />

            <Button
                type="SECONDARY"
                title="Remover turma"
            
            />





        </Container>
    )
}