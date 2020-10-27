import './App.css';
import Container from "react-bootstrap/Container";
import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import data from './data.json'


function CompleteTable({cols, rows}) {
    return (
        <Table striped bordered hover>
            <thead>
            {
                cols.map(col => (
                    <th>{col}</th>
                ))
            }
            </thead>
            <tbody>
            {
                rows.map(row => (<tr>
                    {
                        row.map(data => (<td>
                            {data}
                        </td>))
                    }
                </tr>))
            }
            </tbody>
        </Table>
    )
}

function getColumns(tableType) {
    const placeValues = data.metaData.dimensions.ou;
    const dataValues = data.metaData.dimensions.dx;

    if (tableType === 'dataVsPlace')
        return ['Data vs Place', ...dataValues.map(value => data.metaData.names[value])]
    else
        return ['Place vs Data', ...placeValues.map(value => data.metaData.names[value])]
}
/*
* To get rows, determine which header should be on the row side then loop through it, first element will be
* the header's name. To get the rest of the elements loop through the column header and get the values for
* each column
*   */

function getRows(tableType) {
    const rowValues = data.rows;
    const placeValues = data.metaData.dimensions.ou;
    const dataValues = data.metaData.dimensions.dx;

    if (tableType === 'dataVsPlace')
        return placeValues.map((value, i) => [data.metaData.names[value], ...dataValues.map(val => {
            return rowValues.filter(v => v[0] === val)[i][2]
        })])
    else
        return dataValues.map((value, i) => [data.metaData.names[value], ...placeValues.map(val => {
            return rowValues.filter(v => v[1] === val)[i][2]
        })])
}

function App() {
    return (
        <Container>
            <Row>
                <Col sm={12}>
                    <h1 style={{color: '#389DE0'}}>HISP Teaser</h1>
                </Col>
            </Row>
            <Row center>
                <Col sm={12}>
                    <h2>Table 1</h2>
                </Col>
                <Col sm={{span: 8, offset: 2}} >
                    <CompleteTable cols={getColumns('placeVsData')} rows={getRows('placeVsData')}/>
                </Col>
            </Row>
            <Row>
                <Col sm={12}>
                    <h2>Table 2</h2>
                </Col>
                <Col sm={{span: 8, offset: 2}}>
                    <CompleteTable cols={getColumns('dataVsPlace')} rows={getRows('dataVsPlace')}/>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
