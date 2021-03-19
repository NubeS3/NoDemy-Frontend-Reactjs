import { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { RootState } from '../../reducers/root.reducer';
import { editCategory } from '../../reducers/categories.reducer';

import '../../styles/components/Admin/CatDialog.scss';
import Category from '../../types/Category.type';

const stateToProps = (state: RootState) => ({})

const dispatchToProps = {
    editCategory,
};

const connector = connect(stateToProps, dispatchToProps);

type BasicProps = {
    cat: Category;
    open: boolean;
    onClose: () => void
}

type CatProps = ConnectedProps<typeof connector> & BasicProps;

const EditCatDialog = ({
    cat,
    open,
    onClose,
    editCategory,
}: CatProps) => {
    const [value, setValue] = useState('');
    const [des, setDes] = useState('');

    const handleConfirm = () => {
        let newName = value;
        let newDes = des;
        if (newName.length === 0) {
            newName = cat.name
        }
        if (newDes.length === 0) {
            newDes = cat.description
        }
        editCategory({
            name: newName,
            description: newDes,
        }, cat._id);
        onClose();
    }

    return (
        <Dialog className='cat-modal' open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{cat.name}</DialogTitle>
            <DialogContent style={{
                flexDirection: 'column'
            }}>
                <DialogContentText>
                    Edit category
                </DialogContentText>
                <TextField
                    variant='outlined'
                    autoFocus
                    margin="dense"
                    label="Category's name"
                    fullWidth
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <textarea
                    className='modal-area'
                    placeholder="Description"
                    value={des}
                    onChange={(e) => setDes(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
            <Button onClick={onClose} color='secondary'>
                Cancel
            </Button>
            <Button onClick={handleConfirm} color='primary'>
                Confirm
            </Button>
            </DialogActions>
        </Dialog>    
    )
}

export default connector(EditCatDialog);