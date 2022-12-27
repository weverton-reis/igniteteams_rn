import { Container, Logo, BackButton, BackIcon } from "./styled";


import logoImg from "@assets/logo.png"
import { useNavigation } from "@react-navigation/native";

type Props = {
    showBackButtom?: boolean;
}

export function Header({ showBackButtom = false }: Props){

    const navigation = useNavigation();

    function handleGoBack(){
        navigation.navigate("groups");
    }


    return(
        <Container>
            {
                //Se showBackButtom for verdadeiro mostra o componente BackButtom
                showBackButtom &&
                <BackButton onPress={handleGoBack}>
                    <BackIcon />     
                </BackButton>
            
            }
          
            <Logo source={logoImg}/>
        </Container>
    )
}