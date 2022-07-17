import {useState, useEffect, useImperativeHandle, forwardRef, createRef, useMemo} from 'react';
import {Button} from 'antd';
import {ReactSortable} from "react-sortablejs";
import AreaItem from '../AreaItem';
import styles from './style.module.scss';

let refs = [];

const AreaList = (props, ref) => {
    const [children, setChildren] = useState(props.children);

    useEffect(() => {
        setChildren(props.children);
    }, [props.children])

    useMemo(() => {
        refs = children.map(item => createRef());
    }, [children]);

    const addItemToChildren = () => {
        const newChildren = [...children];
        newChildren.push({});
        setChildren(newChildren);
    }

    const changeAreaItem = (index, item) => {
        const newChildren = [...children];
        newChildren.splice(index, 1, item)
        setChildren(newChildren);
    }

    const removeItemFromChildren = (index) => {
        const newChildren = [...children];
        newChildren.splice(index, 1)
        setChildren(newChildren);
    }

    useImperativeHandle(ref, () => {
        return {
            getSchema: () => {
                const schema = [];
                children.forEach((item, index) => {
                    schema.push(refs[index].current.getSchema());
                });
                return schema;
            },
        }
    })

    return (
        <div>
            <ul className={styles.list}>
                {/*<ReactSortable list={children} setList={setChildren}>*/}
                {
                    children.map((item, index) => (
                        <AreaItem
                            key={index}
                            index={index}
                            item={item}
                            removeItemFromChildren={removeItemFromChildren}
                            changeAreaItem={changeAreaItem}
                            ref={refs[index]}
                        />
                    ))
                }
                {/*</ReactSortable>*/}
            </ul>
            <Button type="primary" ghost onClick={addItemToChildren}>新增页面区块</Button>
        </div>
    );
}

export default forwardRef(AreaList);
