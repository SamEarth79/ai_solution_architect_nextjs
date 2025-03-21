"use client";
import { GeneralActions } from '@/redux/reducers/general';
import { RootState } from '@/redux/store';
import { CircularProgress, DialogActions, DialogContent } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { useDispatch, useSelector } from 'react-redux';

export const DialogBox = () => {
    const general = useSelector((state: RootState) => state.general);

    return (
        <Dialog open={general.showLoader}>
            <DialogContent className='p-4 flex items-center gap-2'>
                {general.loaderText}
                <CircularProgress size={20} sx={{color: "#d0eb85"}}  />
            </DialogContent>
        </Dialog>
    )
}

export const ErrorDialogBox = () => {
    const dispatch = useDispatch();
    const general = useSelector((state: RootState) => state.general);

    return (
        <Dialog open={general.showActionLoader}>
            <DialogContent className='p-4 flex items-center gap-2'>
                {general.actionLoaderText}
            </DialogContent>
            <DialogActions>
                <button 
                className='cursor-pointer py-2 px-4 bg-primary text-black rounded-md'
                    onClick={() => {dispatch(GeneralActions.hideActionLoader())}}
                >
                    Ok
                </button>
            </DialogActions>
        </Dialog>
    )
}