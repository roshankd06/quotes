import React, { Fragment } from "react"
import { useParams, Route, Link, useRouteMatch } from "react-router-dom"
import { useEffect } from "react/cjs/react.development"

import Comments from "../components/comments/Comments"
import HighlightedQuote from "../components/quotes/HighlightedQuote"
import LoadingSpinner from "../components/UI/LoadingSpinner"
import useHttp from "../hooks/hooks/use-http"
import { getSingleQuote } from "../lib/lib/api"

const QuoteDetail = () => {

    const match = useRouteMatch()

    const params = useParams()
    const {quoteId} = params

    const { sendRequest, status, data: loadedQuote, error} = useHttp(getSingleQuote, true)

    useEffect(()=> {
        sendRequest(quoteId)
    }, [sendRequest, quoteId])

    if(status === 'pending'){
        <div className="centered">
            <LoadingSpinner />
        </div>
    }

    if(!loadedQuote){
        return <p>No quote found</p>
    }

    if(error){
        return <p className="centered">{error}</p>
    }

    if(!loadedQuote) {
        return <p>No Quote Found!</p>
    }

    if(!loadedQuote.text){
        return <p>No Quote Found!</p>
    }

    return (
        <Fragment>
            <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
            <Route  path={match.path} exact>
            <div className='centered'>
                <Link className='btn--flat' to={`${match.url}/comments`}>Load Comments</Link>
            </div>
            </Route>
            <Route path={`${match.path}/comments`}>
                <Comments />
            </Route>
        </Fragment>
    )
}

export default QuoteDetail