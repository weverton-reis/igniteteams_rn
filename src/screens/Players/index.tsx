
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
import { playersGetByGroup } from "@storage/player/playersGetByGroup";
import { playersGetByGroupByTeam } from "@storage/player/playersGetByGroupByTeam";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { AppError } from "@utils/AppError";
import { useState } from "react";
import { Alert, FlatList } from "react-native";
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




    return (
        <Container>
            <Header showBackButtom />
            <Highlight
                title={group}
                subTitle="adicione a galera e separe os times"
            />

            <Form>
                <Input
                    placeholder="Nome da pessoa"
                    autoCorrect={false}
                    onChangeText={setNewPlayerName}
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
                keyExtractor={item => item} 
                renderItem={({item} )=> (
                    <PlayerCard
                        name={item}
                        onRemove={() => {}}
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