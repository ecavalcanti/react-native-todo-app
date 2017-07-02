import React, {Component} from 'react'
import {View, Text} from 'react-native'
import styles from './Header.style'

const Header = ({title}) => (
    <View style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
    </View>
)

export default Header