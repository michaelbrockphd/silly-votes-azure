import { Component } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';

export class CampaignTableLoading extends Component {
    render() {
        return(
            <h3>Loading, please wait...</h3>
        );
    }
}

export default class CampaignTable extends Component {
    render() {
        const {
            canModify,
            campaigns
        } = this.props;

        return(
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Campaign Name</TableCell>
                            <TableCell align="center">Pool Size</TableCell>
                            <TableCell align="center">Choice 1</TableCell>
                            <TableCell align="center">Choice 2</TableCell>
                            {canModify && <TableCell align="center">Commands</TableCell>}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {campaigns.map(c => (
                            <TableRow key={c.id}>
                                <TableCell component="th" scope="row">{c.title}</TableCell>
                                <TableCell align="center">{c.poolSize}</TableCell>
                                <TableCell align="center">{c.choices[0]}</TableCell>
                                <TableCell align="center">{c.choices[1]}</TableCell>
                                {canModify && <TableCell align="center">X</TableCell>}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
};
