update search_tags
set drill = $1,
    hammer = $2,
    hammer_drill = $3,
    jack_hammer = $4,
    sander = $5,
    grinder = $6,
    auger = $7,
    saw = $8,
    mower = $9,
    trimmer = $10,
    ladder = $11,
    welding = $12,
    air_compressor = $13,
    vacuum = $14, 
    pressure_washer = $15,
    ratchet = $16,
    wrench = $17,
    lawn_tool = $18
where tool_id = $19