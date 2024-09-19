import React, { useMemo, useState } from 'react';
import styled from "styled-components";
import bg from '../img/bg.png';

import { MainLayout } from "../styles/Layouts";
import Orb from "../Components/Orb/Orb";
import Navigation from "../Components/Navigation/Navigation";

import Dashboard from "../Components/Dashboard/Dashboard";
import Incomes from "../Components/Incomes/Incomes";
import Expenses from "../Components/Expenses/Expenses";

export default function Home() {
    const [active, setActive] = useState(1);

    const orbMemo = useMemo(() => {
        return <Orb />;
    }, []);

    const displayData = () => {
        switch (active) {
            case 1:
                return <Dashboard />;
            case 2:
                return <Dashboard />;
            case 3:
                return <Incomes />;
            case 4:
                return <Expenses />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <HomeStyled bg={bg} className="App">
            {orbMemo}
            <MainLayout>
                <Navigation active={active} setActive={setActive} />
                <main>
                    {displayData()}
                </main>
            </MainLayout>
        </HomeStyled>
    );
}

const HomeStyled = styled.div`
    height: 100vh;
    width: 100vw;
    background-image: url(${props => props.bg});
    background-size: cover;
    background-position: center;
    position: relative;

    main {
        flex: 1;
        background: rgba(252, 246, 249, 0.78);
        border: 3px solid #FFFFFF;
        backdrop-filter: blur(4.5px);
        border-radius: 32px;
        overflow-x: hidden;
        width: 100%;
        padding: 1rem;

        &::-webkit-scrollbar {
            width: 0;
        }
    }

    @media (max-width: 768px) {
        main {
            padding: 0.5rem;
            border-radius: 16px;
        }

        ${MainLayout} {
            flex-direction: column;
            align-items: center;
            padding: 1rem;
        }
    }

    @media (max-width: 480px) {
        main {
            padding: 0.5rem;
            border-radius: 10px;
        }

        ${MainLayout} {
            flex-direction: column;
            align-items: center;
            padding: 0.5rem;
        }
    }
`;
