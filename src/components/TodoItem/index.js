import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import styled from 'styled-components';

import IconButton from 'components/Button/IconButton';

//language=SCSS prefix=&{ suffix=}
const StyledTodoItem = styled.li`
    padding: 15px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    width: 100%;
    border-bottom: 1px solid #E0E0E0;
    &:hover {
      background-color: rgba(240, 240, 240, 0.8);
    }
    h4 {
      margin: 0;
      font-weight: 600;
    }

    .content {
      margin-left: 15px;
    }

    .tools {
      position: absolute;
      right: 10px;
      i {
        color: #a3a4c5;
      }
    }
    .material-icons {
      vertical-align: middle;
    }
    .icon-check {
      color: ${props=>props.theme.themeColor4};
    }

    span {
      color: rgba(128, 131, 176, 0.8)
    }
`;

function TodoItem(props) {

    return (
        <StyledTodoItem isChecked={props.isChecked}>
            <div onClick={props.onClickCheckbox}>
                {props.isChecked ? (<i className="material-icons icon-check">check</i>):(<i className="material-icons">crop_square</i>)}
            </div>
            <div className="content" onClick={props.onClickContent}>
                <h4>
                    {_.truncate(props.task.get('title'), {'length': 24})}</h4>
                {props.task.get('date')!==null ? (<span>{moment(props.task.get('date')).fromNow(true)}</span>):('')}
            </div>
            <div className="tools">
                <IconButton onClick={props.onClickEdit}>
                    <i className="material-icons">edit</i>
                </IconButton>
                <IconButton onClick={props.onClickRemove}>
                    <i className="material-icons">close</i>
                </IconButton>
            </div>
        </StyledTodoItem>
    );
}

TodoItem.propTypes = {
    task: PropTypes.object,
    onClickContent: PropTypes.func,
    onClickCheckbox: PropTypes.func,
    onClickEdit: PropTypes.func,
    onClickRemove: PropTypes.func,
    isChecked: PropTypes.bool,
};

export default TodoItem;