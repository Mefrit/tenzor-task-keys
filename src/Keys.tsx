import { IItem } from './index';
import { useEffect, useState } from 'react';
function KeyEdit(props: any) {
    return (
        <div
            tabIndex={-1}
            onClick={(ev) => {
                props.setEditMode(true);
            }}
            onKeyDown={(ev) => props.onKeyDown(ev)}
        >
            <div>
                <input
                    autoFocus
                    type="text"
                    defaultValue={props.name}
                    onChange={(ev) => {
                        props.setBoofer(ev.target.value);
                    }}
                />
            </div>
        </div>
    );
}
function KeyItem(props: { elem: IItem }) {
    const [edit, setEditMode] = useState(false);
    const [name, setName] = useState(props.elem.name);
    const [boofer, setBoofer] = useState(props.elem.name);
    const onKeyDown = (e: any) => {
        if (e.code === 'Enter' || e.key === 'Enter') {
            e.preventDefault();
            setName(boofer);
            setEditMode(false);
        }
        if (e.code === 'Escape' || e.key === 'Escape') {
            e.preventDefault();
            setName(props.elem.name);
            setBoofer(props.elem.name);
            setEditMode(false);
        }
    };
    useEffect(() => {}, [edit]);

    if (edit) {
        return (
            <KeyEdit
                setEditMode={setEditMode}
                onKeyDown={onKeyDown}
                setBoofer={setBoofer}
                name={name}
            />
        );
    }
    return (
        <div
            onClick={(ev) => {
                setEditMode(true);
            }}
        >
            {name}
        </div>
    );
}
export function Keys(props: { initialData: IItem[]; sorting: 'ASC' | 'DESC' }) {
    function renderKeyItems(data: IItem[], sorting: 'ASC' | 'DESC') {
        const sorted = data.sort((a, b) => {
            return sorting === 'ASC' ? a.id - b.id : b.id - a.id;
        });
        return sorted.map((elem: IItem) => {
            return <KeyItem key={elem.id} elem={elem} />;
        });
    }
    return <div>{renderKeyItems(props.initialData, props.sorting)}</div>;
}
