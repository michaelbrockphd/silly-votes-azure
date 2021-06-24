import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField } from '@material-ui/core';

const CampaignDetailsDialog = (props) => {
    const {
        data,
        isOpen,
        isEditing,
        onConfirm,
        onCancel,
        onClose
    } = props;

    return(
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>{isEditing ? 'Edit Campaign' : 'New Campaign'}</DialogTitle>

            <DialogContent>
                {data && <Grid container direction="column" spacing={2}>
                    <TextField
                        label="Campaign Name"
                        value={data.title} />
                    <TextField
                        label="Pool Size"
                        value={data.poolSize} />
                    <TextField
                        label="Choice 1"
                        value={data.choices[0]} />
                    <TextField
                        label="Choice 2"
                        value={data.choices[1]} />
                </Grid>}
            </DialogContent>
            
            <DialogActions>
                <Button onClick={onCancel}>Cancel</Button>
                <Button onClick={onConfirm}>{isEditing ? 'Save' : 'Add'}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CampaignDetailsDialog;
