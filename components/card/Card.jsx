import React from 'react';
import { Panel} from 'rsuite';
import '../../styles/Card.css';
import toast from 'react-hot-toast';
import Image from "next/image"


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
                <h2>{nome}</h2>
                <div className="datas">
                    <p>{data_pub}</p>
                    <p>{data_jul}</p>
                </div>
                {content.map((c, id) =>
                    <div className="content" key={id}>
                        <div className="content-btn">
                            {c.title === 'Ementa' ?
                                <a className="btn-pdf" href={url} target="_blank" rel="noreferrer">
                                    <Image width="60px" height="70px" src='/pdf.png' alt='pdf'/>
                                </a>
                            : null} 
                            {c.title==='Ementa' ? <button className="btn" onClick={() => (navigator.clipboard.writeText(c.content), toast.success('Copied'))} >Copiar Ementa</button> : null}
                            {c.title==='Ementa' ? <button className="btn" onClick={() => (navigator.clipboard.writeText(url), toast.success('Copied'))} >Copiar PDF Link</button> : null}
                        </div>
                        <p className="content-text" key={c.title}>
                            <b className="content-title">{c.title}:</b> {c.content}
                        </p>
                    </div>
                )}
                <div className="btn-likes">
                    {!voteData[arrId]?.vote || voteData[arrId]?.vote==='dislike' ? 
                        <button className={`btn--like ${voteData[arrId]?.vote === 'like' ? 'active' : null}`} onClick={() => toggleLike(arrId, 'like')}><i className="fas fa-thumbs-up fa-2x"></i></button>
                    : voteData[arrId]?.vote==='like' ?
                        <button className={`btn--like ${voteData[arrId]?.vote === 'like' ? 'active' : null}`} onClick={() => toggleLike(arrId, '')}><i className="fas fa-thumbs-up fa-2x"></i></button>
                    : null}

                    {!voteData[arrId]?.vote || voteData[arrId]?.vote==='like' ? 
                        <button className={`btn--like ${voteData[arrId]?.vote === 'dislike' ? 'inactive' : null}`} onClick={() => toggleLike(arrId, 'dislike')}><i className="fas fa-thumbs-down fa-2x"></i></button>
                    : voteData[arrId]?.vote==='dislike' ?
                        <button className={`btn--like ${voteData[arrId]?.vote === 'dislike' ? 'inactive' : null}`} onClick={() => toggleLike(arrId, '')}><i className="fas fa-thumbs-down fa-2x"></i></button>
                    : null}
                </div> 
            </Panel>
        )
    }
}

export default Card;


