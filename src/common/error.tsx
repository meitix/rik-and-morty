import React from 'react'

export  function ErrorView(props: {error?: string}) {
    return (
        <div className="text-center text-lg">
            {props.error || 'Something went wrong, check your internet connection or try again later!'}
        </div>
    )
}
