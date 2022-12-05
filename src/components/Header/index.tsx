import { Container, Logo, BackButton, BackIcon } from "./styled";


import logoImg from "@assets/logo.png"

type Props = {
    showBackButtom?: boolean;
}

export function Header({ showBackButtom = false }: Props){
    return(
        <Container>
            {
                //Se showBackButtom for verdadeiro mostra o componente BackButtom
                showBackButtom &&
                <BackButton>
                    <BackIcon />     
                </BackButton>
            
            }
          
            <Logo source={logoImg}/>
        </Container>
    )
}