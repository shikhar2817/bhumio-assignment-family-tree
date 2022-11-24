import React, { useRef, useState } from 'react'
import { useTreeState } from '../../contexts'
import { FolderNode } from '../FolderNode'
import { LayoutHeader } from '../LayoutHeader'
import { Modal } from '@mui/material'
import { FamilyDetailsForm } from '../FamilyDetailsForm'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Search } from "./Search";


export const FolderStructure = () => {

    const depth = useRef(0);

    const [treeState] = useTreeState();

    const [contextMenu, setContextMenu] = useState(null);

    const handleContextMenu = (event) => {
        event.preventDefault();
        setContextMenu(
            contextMenu === null
                ? {
                    mouseX: event.clientX + 2,
                    mouseY: event.clientY - 6,
                }
                : null,
        );
    };

    const handleClose = () => {
        setContextMenu(null);
    };


    return (
        <div
            onContextMenu={handleContextMenu}
            style={{
                borderBottom: '2px solid black',
                width: '100%',
                flexGrow: 1,
                overflowY: 'auto',
                // cursor: "pointer"
            }}
        >
            <LayoutHeader header={'Family Tree'} />
            <Search />
            {Object.keys(treeState).length > 0 && (

                <ul>
                    <FolderNode node={treeState} key={treeState.id} depth={depth.current} />
                </ul>
            )}

            {Object.keys(treeState).length < 1 && (
                <>
                    <Modal open={true} >
                        <FamilyDetailsForm />
                    </Modal>
                </>
            )}

            <Menu
                open={contextMenu !== null}
                onClose={handleClose}
                anchorReference="anchorPosition"
                anchorPosition={
                    contextMenu !== null
                        ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                        : undefined
                }
            >
                <MenuItem onClick={handleClose}>Add Family Member</MenuItem>
                <MenuItem onClick={handleClose}>Delete Family Member</MenuItem>
                <MenuItem onClick={handleClose}>Print Family Member</MenuItem>
            </Menu>
        </div>
    );
};
