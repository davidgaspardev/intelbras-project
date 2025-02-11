import styled from "styled-components";
import { Flex } from "./base/Flex";
import { Text } from "./base/Text";
import { Box } from "./base/Box";
import { useEffect } from "react";
import { ComponentData } from "../utils/types";

type Props = {
    data?: ComponentData;
    onClickAdd: (component: ComponentData) => void;
    onClickUpdate: (component: ComponentData) => void;
    onClickBack: () => void;
}

export default function ComponentPopup(props: Props) {
    const { data, onClickAdd, onClickUpdate, onClickBack } = props;

    const hasData = data ? true : false;

    useEffect(() => {
        const componentPopup = document.getElementById("component-popup") as HTMLFormElement;

        componentPopup.onsubmit = (event) => {
            event.preventDefault();
            loadComponentData(componentPopup, hasData ? (component) => {
                onClickUpdate({
                    ...component,
                    id: data?.id,
                });
            } : onClickAdd);
        };
    }, []);

    return (
        <ComponentPopupStyled className="children-center">
            <form id="component-popup">
                <h1>Componente fotovoltaico</h1>

                <hr/>

                <input required name="name" type="text" defaultValue={data?.name} placeholder="Nome"/>
                <input required name="gtin" type="number" defaultValue={data?.gtin} placeholder="GTIN"/>
                <hr/>
                <Flex>
                    <Box width="50%">
                        <label htmlFor="systemType">Tipo de sistema</label>
                        <select required defaultValue={data?.systemType} name="systemType">
                            <option value="ONGRID">ongrid</option>
                            <option value="OFFGRID">offgrid</option>
                        </select>
                    </Box>
                    <Box width="50%">
                        <label htmlFor="componentGroup">Grupo de componente</label>
                        <select required defaultValue={data?.componentGroup} name="componentGroup">
                            <option value="PERFIL">perfil</option>
                            <option value="MODULE">module</option>
                            <option value="INVERSOR">inversor</option>
                            <option value="CABOS">cabos</option>
                            <option value="CONECTORES">conectores</option>
                            <option value="BATERIAS">baterias</option>
                        </select>
                    </Box>
                </Flex>
                <Text>Volume</Text>
                <Flex>
                    <Box width="33%">
                        <input required defaultValue={data?.height} name="height" type="number" step="any" placeholder="Altura"/>
                    </Box>
                    <Box width="33%">
                        <input required defaultValue={data?.width} name="width" type="number" step="any" placeholder="Largura"/>
                    </Box>
                    <Box width="33%">
                        <input required defaultValue={data?.depth} name="depth" type="number" step="any" placeholder="Profundidade"/>
                    </Box>
                </Flex>
                <Text>Peso</Text>
                <Flex>
                    <Box width="50%">
                        <input required defaultValue={data?.weight} name="weight" type="number" step="any" placeholder="Peso bruto"/>
                    </Box>
                    <Box width="50%">
                        <input required defaultValue={data?.netWeight} name="netWeight" type="number" step="any" placeholder="Peso líquido"/>
                    </Box>
                </Flex>

                <input type="submit" value={hasData ? "atualizar" : "adicionar"}/>

            </form>

            <Text onClick={onClickBack}>voltar</Text>

        </ComponentPopupStyled>
    );
}

function loadComponentData(componentPopup: HTMLFormElement, callback: (component: ComponentData) => void) {
    function getValue(name: string) {
        return (componentPopup.elements.namedItem(name) as HTMLInputElement).value;
    }

    const name = getValue("name")
    const gtin = getValue("gtin");
    const systemType = getValue("systemType");
    const componentGroup = getValue("componentGroup");
    const height = Number.parseFloat(getValue("height"));
    const width = Number.parseFloat(getValue("width"));
    const depth = Number.parseFloat(getValue("depth"));
    const weight = Number.parseFloat(getValue("weight"));
    const netWeight = Number.parseFloat(getValue("netWeight"));

    callback({
        name,
        gtin,
        systemType,
        componentGroup,
        height,
        width,
        depth,
        weight,
        netWeight
    } as ComponentData);
}

const ComponentPopupStyled = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: var(--color-shadow);
    z-index: 90;

    form {
        width: 450px;
        background-color: white;
        border-radius: 10px;
        padding: 10px;
        min-height: 100px;

        h1 {
            text-align: center;
            font-size: 20pt;
            margin-top: 16px;
            font-weight: 500;
        }

        label {
            font-size: 10pt;
            margin-left: 20px;
        }

        h1, label, p {
            color: #646464;
        }

        input {
            margin: 8px auto;
        }

        hr {
            margin: 16px 0px;
            opacity: 0.25;
        }

        p {
            margin-left: 20px;
        }

        input[type=submit] {
            background: var(--color-secondary);
            color: white;
            font-weight: bold;
            cursor: pointer;
        }

        input[type=submit]:hover {
            background: var(--color-primary);
        }
    }

    > p {
        color: white;
        text-decoration: underline;
        margin-top: 10px;
        cursot: pointer;
    }
`;