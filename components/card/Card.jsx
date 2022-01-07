import React from 'react';
import { Panel, Button } from 'rsuite';
import '../../styles/Card.css';
import toast from 'react-hot-toast';


class Card extends React.Component {

    render() {
        const {content, nome, data_pub, data_jul, initials, name, url, arrId, toggleLike, voteData} = this.props

        return (
            <Panel
                className="turivius-card"
                shaded
                bordered
            >
                <h1>{name} - {initials}</h1>
                <h3>{nome}</h3>
                <div className="">
                    <p>{data_pub}</p>
                    <p>{data_jul}</p>
                </div>
                {content.map((c, id) =>
                    <div key= {id}>
                        {c.title === 'Ementa' ?
                                <a href={url} target="_blank" rel="noreferrer">
                                    <img width="50px" src='/pdf.png' alt='pdf'></img>
                                </a>
                        : null} 

                        {c.title==='Ementa' ? <Button onClick={() => (navigator.clipboard.writeText(c.content), toast.success('Copied'))} >Copia Ementa</Button> : null}
                        {c.title==='Ementa' ? <Button onClick={() => (navigator.clipboard.writeText(url), toast.success('Copied'))} >Copia PDF Link</Button> : null}

                        <p key={c.title}>
                            <b>{c.title}:</b>
                            {c.content}
                        </p>
                    </div>
                )}

                <Button className={`${voteData[arrId]?.vote==='like' ? 'active' : null}`} onClick={() => toggleLike(arrId, 'like')}>Like</Button>
                <Button className={`${voteData[arrId]?.vote==='dislike' ? 'active' : null}`} onClick={() => toggleLike(arrId, 'dislike')}>Dislike</Button>
             
            </Panel>
        )
    }
}

export default Card;


