import { connect, ConnectedProps } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { RootState } from '../../reducers/root.reducer';
import { createCategory } from '../../reducers/categories.reducer';

import '../../styles/components/Admin/CatDialog.scss';
import Category from '../../types/Category.type';
import { useState } from 'react';

const stateToProps = (state: RootState) => ({})

const dispatchToProps = {
    createCategory,
};

const connector = connect(stateToProps, dispatchToProps);

type BasicProps = {
    cat: Category;
    open: boolean;
    onClose: () => void
}

type CatProps = ConnectedProps<typeof connector> & BasicProps;

const CatDialog = ({
    cat,
    open,
    onClose,
    createCategory,
}: CatProps) => {
    const [value, setValue] = useState('');
    const [des, setDes] = useState('');

    const handleConfirm = () => {
        createCategory({
                name: value,
                parentCategory: cat._id,
                description: des,
        });
        onClose();
    }

    return (
        <Dialog className='cat-modal' open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{cat.name}</DialogTitle>
            <DialogContent style={{
                flexDirection: 'column'
            }}>
                <DialogContentText>
                    Create new category
                </DialogContentText>
                <TextField
                    variant='outlined'
                    autoFocus
                    margin="dense"
                    label="Category's name"
                    fullWidth
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

export default connector(CatDialog);