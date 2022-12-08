import { Container, Content, Icon } from "./styles";


import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { Input } from "@components/Input";

export function NewGroup(){
    return(
        <Container>
            <Header showBackButtom/>

            <Content>
                <Icon/>
                <Highlight
                    
                    title="Nova turma"
                    subTitle="crie a turma para adicionar as pessoas"
                />

                <Input/>

                <Button
                    title="Criar"
                    style={{marginTop: 20}}

                />
            </Content>

        </Container>
    )
}