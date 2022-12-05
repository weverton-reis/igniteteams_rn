import { Container, Logo } from "./styled";

import logoImg from "@assets/logo.png"


export function Header(){
    return(
        <Container>
            <Logo source={logoImg}/>
        </Container>
    )
}