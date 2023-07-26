import React from 'react'
import { Helmet } from 'react-helmet'

const MetaData = ({ title }) => {
    return (
        <Helmet>
            <title>{`${title} - Nhóm G03 Web Văn Lang`}</title>
        </Helmet>
    )
}

export default MetaData
