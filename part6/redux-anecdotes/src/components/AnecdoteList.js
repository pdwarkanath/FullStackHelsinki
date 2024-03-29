import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()
    anecdotes.sort((a, b) => (a.votes > b.votes) ? -1 : 1);

    return (
        <>
        {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => dispatch(voteAnecdote(anecdote.id))}>vote</button>
            </div>
            </div>
        )}
        </>
    )
}

export default AnecdoteList