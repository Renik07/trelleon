import React, { useState } from "react";
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Masonry from 'react-masonry-css';
import { Modal } from "react-responsive-modal";
import ReactMarkdown from "react-markdown";

import link from '../public/img/link.svg';
import defaultCover from '../public/img/leon-bg.jpg';
import Image from 'next/image'

export const Cards = ({ data, scrollPosition }) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [selectedElementID, setSelectedElementID] = useState(null);

    const openModal = (id) => {
        setSelectedElementID(id);
        setIsOpen(true);
    }

    const closeModal = () => {
        setSelectedElementID(null);
        setIsOpen(false);
    }

    const breakpointColumnsObj = {
        default: 3,
        1365: 2,
        768: 1
    };
    return (
        <>
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {data.map((card, i) => (
                    <div key={card.id} className="item">
                        <a target="_blank" href={card.shortUrl} className="item-link">
                            <Image
                                src={link}
                                alt="link"
                            />
                        </a>
                        <div className="item-inner" onClick={() => openModal(card.id)}>
                            <LazyLoadImage
                                className='grid-img'
                                alt="img"
                                width="100%"
                                height="auto"
                                src={card.coverUrl ? card.coverUrl : defaultCover.src}
                                effect="blur"
                                scrollPosition={scrollPosition}
                            />
                            <div className="item-content">
                                <div className="item-head">
                                    <div className={card.nameBoard == 'CASINO' ? 'labelCasino' : 'labelBook'}>{card.nameBoard}</div>
                                    <div className="date">{card.attachments && card.attachments[card.attachments.length - 1].date ? card.attachments[card.attachments.length - 1].date.slice(0, 10) : "date"}</div>
                                    <div className="author">by {card.members[0] && card.members[0].fullName ? card.members[0].fullName : "name"} </div>
                                </div>
                                <h3 className="item-title">{card.name}</h3>
                            </div>
                        </div>
                        {selectedElementID === card.id && (
                            <Modal
                                open={modalIsOpen}
                                onClose={closeModal}
                                classNames='modal'
                                center
                            >
                                <LazyLoadImage
                                    className='modal-img'
                                    alt="modal image"
                                    width="100%"
                                    height="auto"
                                    src={card.coverUrl ? card.coverUrl : defaultCover.src}
                                    effect="blur"
                                    scrollPosition={scrollPosition}
                                />
                                <div className="modal-content">
                                    <div className="modal-head">
                                        <div className={card.nameBoard == 'CASINO' ? 'labelCasino' : 'labelBook'}>{card.nameBoard}</div>
                                        <span className="modal-date date">{card.attachments && card.attachments[card.attachments.length - 1].date ? card.attachments[card.attachments.length - 1].date.slice(0, 10) : "date"}</span>
                                        <span className="modal-author author">by {card.members[0] && card.members[0].fullName ? card.members[0].fullName : "name"}</span>
                                        <a target="_blank" href={card.shortUrl} className="modal-link">
                                            <Image
                                                src={link}
                                                alt="link"
                                            />
                                        </a>
                                    </div>
                                    <h2 className="modal-title">{card.name}</h2>
                                    <ReactMarkdown className="modal-desc">{card.desc}</ReactMarkdown>
                                </div>
                            </Modal>
                        )}
                    </div>
                ))}
            </Masonry>
        </>
    )
}

export default trackWindowScroll(Cards);