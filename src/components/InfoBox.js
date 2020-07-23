import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'
import './InfoBox.css';
const InfoBox = ({ title, cases, total, onClick, active, isRed }) => {
    return (
        <Card onClick={onClick} className={`infoBox ${active && 'selected'} ${isRed && "red"}`}>
            <CardContent>
                <Typography className="infobox__title" color="textSecondary">
                    {title}
                </Typography>
                <h2 className="infobox__cases">
                    {cases}
                </h2>
                <Typography color="textSecondary" className="infobox__total">
                    {total}
                      Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
