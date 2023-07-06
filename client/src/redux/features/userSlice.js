import {createSlice} from '@reduxjs/toolkit'
//定义初始状态对象 initialState，
//其中 value 属性初始化为空对象。
const initialState ={value:{}}

export const userSlice = createSlice ({
    name:'user',
    initialState,
    reducers:{
        //action creator,将接收到的用户数据（action.payload）设置为状态对象的value 属性
        setUser:(state,action)=> {
            state.value = action.payload
        }
    }
})
// 导出 setUser action对象，用于触发用户状态的更新
export const {setUser} =userSlice.actions

//用于处理和更新状态的逻辑
export default userSlice.reducer

