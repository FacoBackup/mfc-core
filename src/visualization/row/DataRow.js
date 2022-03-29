import React, {useContext, useMemo} from 'react'
import PropTypes from "prop-types";
import styles from './styles/Row.module.css'
import RowKey from "./components/RowKey";
import DataProvider from "../list/hooks/DataProvider";

export default function DataRow(props) {
   const context = useContext(DataProvider)
   const {
      keys,
      data,
      selfContained
   } = useMemo(() => {
      return {
         keys: !context.notValid ? context.keys : props.keys,
         data: !context.notValid && typeof props.index === 'number' ? context.data[props.index] : props.object,
         selfContained: !context.notValid ? context.selfContained : props.selfContained,
      }
   }, [context, props.index, props.keys, props.object, props.selfContained])

   return (
      <div ref={props.reference} onClick={props.onClick} className={[styles.wrapper, props.className].join(' ')}
           style={props.styles}>
         {keys.map((k, i) => (
            <React.Fragment key={'key-' + k.key + '-' + i}>
               <RowKey
                  noTitle={props.noTitle}
                  index={i} className={props.cellClassName} styles={props.cellStyles} field={k} object={data}
                       selfContained={selfContained}/>
            </React.Fragment>
         ))}
      </div>
   )
}

DataRow.propTypes = {
   index: PropTypes.number,
   className: PropTypes.string,
   styles: PropTypes.object,

   cellClassName: PropTypes.string,
   cellStyles: PropTypes.object,

   selfContained: PropTypes.bool,
   object: PropTypes.object,
   keys: PropTypes.arrayOf(PropTypes.shape({

      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['string', 'number', 'object', 'date', 'bool', 'array']),
      getColor: PropTypes.func,
      subfieldKey: PropTypes.string,
      visible: PropTypes.bool,
      maskStart: PropTypes.any,
      maskEnd: PropTypes.any,
      subType:  PropTypes.oneOf(['string', 'number', 'object', 'date', 'bool']),
      hoursOffset: PropTypes.number,


      method: PropTypes.func
   })),
   onClick: PropTypes.func,
   reference: PropTypes.any,
   noTitle: PropTypes.bool
}
